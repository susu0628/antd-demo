<template>
    <div class="gm-calendar">
        <div class="gm-calendar-control">
            <div class="gm-calendar-title">
                <span class="canendar-cancel" @click="onCancel">取消</span>
                <span class="canendar-date" v-text="title"></span>
            </div>
            <div class="gm-calendar-week">
                <div v-for="(item, index) of week" :key="index">{{item}}</div>
            </div>
        </div>
        <!-- <div class="gm-float-title" v-text="titleDate"></div> -->
        <div class="gm-calendar-months" 
            @touchstart.stop="touchStart" 
            @touchmove.stop.prevent="touchMove" 
            @touchend.stop="touchEnd"
        >
            <div class="gm-canendar-panel" ref="months">
                <div class="gm-calendar-month" :datamonth="month.title" v-for="(month, index) in monthsData" :key="index">
                    <div class="gm-calendar-month-title">{{month.title}}</div>
                    <div class="gm-calendar-month-con">
                        <div 
                            class="gm-calendar-month-day" 
                            v-for="(day, index) in month.monthData" 
                            @click="getClass(month, day).indexOf('gm-calendar-month-day-disabled') > -1 ? '' : chooseDate(month, day)" 
                            :key="index"
                            :class="getClass(month, day)"
                        >
                            <div 
                                class="gm-calendar-month-day-top" 
                                v-if="getClass(month, day).indexOf('gm-calendar-month-day-today') > -1"
                            >
                                今天
                            </div>
                            <div 
                                class="gm-calendar-month-day-top"
                                v-else-if="getClass(month, day).indexOf('gm-calendar-month-day-festival') > -1"
                            >
                                {{getFestival(month, day)}}
                            </div>
                            <div class="gm-calendar-month-day-content">{{day.content}}</div>
                            <div 
                                class="gm-calendar-month-day-tip" 
                                v-if="getClass(month, day).indexOf('gm-calendar-month-day-start-active') > -1"
                            >
                                开始
                            </div>
                            <div
                              class="gm-calendar-month-day-tip" 
                              v-else-if="getClass(month, day).indexOf('gm-calendar-month-day-end-active') > -1" 
                            >
                                结束
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="gm-canendar-comfirm">
            <div class="gm-canendar-btn" @click="handleConfirm">确定</div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import calendar from './lunar'
export default {
    name: 'Calendar',
    data: () => {
        return {
            week: ['日', '一', '二', '三', '四', '五', '六'],
            monthsData: [], // 渲染的moths
            touchParams: { // 触摸屏幕滑动的参数
                startY: 0,
                endY: 0,
                startTime: 0,
                endTime: 0
            },
            transformY: 0,
            scrollDistance: 0, // 滑动的距离
            startDate: '', // 开始日期
            endDate: '', // 结束日期
            dayPrefix: 'gm-calendar-month-day', // 类名的前缀
            // titleDate: ''
        }
    },
    props: {
        title: {
            type: String
        },
        minDate: {
            type: String
        },
        maxDate: {
            type: String
        },
        solarFestival: { // 阳历节日自定义,格式[{'0101': '元旦'}]
            type: Array
        },
        lunarFestival: { // 农历节日自定义，格式[{'0101': '春节'}]
            type: Array
        },
        onCancel: {
            type: Function
        },
        onOk: {
            type: Function
        }
    },
    mounted () {
        this.initData()
    },
    methods: {
        handleConfirm () {
            if (this.startDate !== '') {
                this.$emit('onOk', this.startDate, this.endDate)
            }
            this.onCancel()
        },
        splitDate (date) { // 将YYYY-MM-DD的日期格式切割
            let [year, month, day = ''] = date.split('-');
            return {
                year,
                month,
                day
            }
        },
        /**
         * 获取某年某月的实际天数
         * 传入年、月两个参数
         */
        getMonthDays (year, month) {
            let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 定义每个月的天数，注意闰年和平年
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                daysInMonth[1] = 29
            }
            if (/^0/.test(month)) {
                month = month.split('')[1]
            }
            return daysInMonth[month - 1]
        },
        /**
         * 将月份转换成可渲染的格式，注意每个月的1号是星期几，如果不是周天，需补位
         */
        getMonthData (year, month) {
            if (month === '00') {
                month === '12'
                year === year - 1 + ''
            }
            let oneDay = new Date(year, month, 1).getDay()  // 获取具体年月1号是星期几
            let monthData = []
            if (oneDay > 0) {
                for (let i = 0; i < oneDay; i++) {
                    monthData.push({ // 前置补空
                        type: 'pre',
                        content: ''
                    })
                }
            }
            const monthDay = this.getMonthDays(year, month)
            for (let i = 0; i < monthDay; i++) {
                monthData.push({
                    type: 'day',
                    content: i + 1
                })
            }
            return {
                title: year + '年' + month + '月',
                monthData: monthData
            }
        },
        getMonth (date, type) {
            let {year, month} = this.splitDate(date)
            let prevMonth = (month - 1).toString().padStart(2, '0')
            let prevYear = year
            if (prevMonth === '00') {
                prevMonth = '12'
                prevYear = prevYear - 1 + ''
            }
            if (type === 'next') { // 加载下一个月
                let currentMonthData =  this.getMonthData(year, month)
                this.monthsData.push(currentMonthData)
            } else if (type === 'prev') { // 加载上一个月
                let currentMonthData =  this.getMonthData(year, month)
                this.monthsData.unshift(currentMonthData)
            } else {
                let currentMonthData =  this.getMonthData(year, month)
                let preMonthData = this.getMonthData(prevYear, prevMonth)
                this.monthsData.push(preMonthData, currentMonthData)
            }
            
        },
        initData () {
            let today_date = moment(new Date()).format('YYYY-MM-DD'); // 获取当前日期
            this.getMonth(today_date)

        },
        setTransform(translateY = 0, type, time = 1000) {
            if (type === 'end') {
                this.$refs.months.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`;
            } else {
                this.$refs.months.style.webkitTransition = '';
            }

            this.$refs.months.style.webkitTransform = `translateY(${translateY}px)`;
            this.scrollDistance = translateY;
        },
        setMove(move, type, time) {
            let updateMove = move + this.transformY;
            let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            let offsetHeight = this.$refs.months.offsetHeight;
            if (type === 'end') {
                // 限定滚动距离
                if (updateMove > 0) {
                    updateMove = 0;
                }
                if (updateMove < 0 && updateMove < -offsetHeight + h - 70) {
                    updateMove = -offsetHeight + h - 70;
                }
                if (offsetHeight <= h && this.monthsData.length == 1) {
                    updateMove = 0;
                }
                let endMove = updateMove;
                this.setTransform(endMove, type, time);
            } else {
                if (updateMove > 0 && updateMove > 100) {
                updateMove = 100;
                }
                if (updateMove < -offsetHeight + h - 170 && this.monthsData.length > 1) {
                updateMove = -offsetHeight + h - 170;
                }
                if (updateMove < 0 && updateMove < -100 && this.monthsData.length == 1) {
                updateMove = -100;
                }
                this.setTransform(updateMove);
            }
        },
        // 获取XXXX年XX月中的年月
        changeDate (date) {
            let year = parseInt(date.slice(0, 4));
            let month = parseInt(date.slice(5, 7)).toString().padStart(2, '0');
            return {
                year,
                month
            }
        },
        // 根据type的类型，加载前一个月或者加载后一个月
        getCurrData(type) {
            let monthData = type == 'prev' ? this.monthsData[0] : this.monthsData[this.monthsData.length - 1];
            let {year, month} = this.changeDate(monthData.title)
            month = parseInt(month.toString().replace(/^0/, ''))
            switch (type) {
                case 'prev':
                    month == 1 && (year -= 1);
                    month = month == 1 ? 12 : --month;
                    break;
                case 'next':
                    month == 12 && (year += 1);
                    month = month == 12 ? 1 : ++month;
                    break;
            }
            month = month.toString().padStart(2, '0')
            return [year, month, 1].join('-');
        },
        touchStart (event) {
            let changedTouches = event.changedTouches[0]
            this.touchParams.startY = changedTouches.pageY
            this.touchParams.startTime = event.timestamp || Date.now()
            this.transformY = this.scrollDistance
        },
        touchMove (event) {
            let changedTouches = event.changedTouches[0]
            this.touchParams.lastY = changedTouches.pageY
            this.touchParams.lastTime = event.timestamp || Date.now()
            let move = this.touchParams.lastY - this.touchParams.startY
            if (Math.abs(move) < 5) {
                return false;
            }
            this.setMove(move)
        },
        touchEnd (event) {
            let changedTouches = event.changedTouches[0];
            this.touchParams.lastY = changedTouches.pageY;
            this.touchParams.lastTime = event.timestamp || Date.now();
            let move = this.touchParams.lastY - this.touchParams.startY;
            if (Math.abs(move) < 5) {
                return false;
            }
            let updateMove = move + this.transformY;
            let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            let offsetHeight = this.$refs.months.offsetHeight;
            if (updateMove > 0) {
                this.getMonth(this.getCurrData('prev'), 'prev');
            } else if (updateMove < -offsetHeight + h * 2) {
                this.getMonth(this.getCurrData('next'), 'next');
                if (Math.abs(move) >= 300) {
                this.getMonth(this.getCurrData('next'), 'next');
                }
            }

            let moveTime = this.touchParams.lastTime - this.touchParams.startTime;
            if (moveTime <= 300) {
                move = move * 2;
                moveTime = moveTime + 1000;
                this.setMove(move, 'end', moveTime);
            } else {
                this.setMove(move, 'end');
            }
        },
        // 将日期格式转换成YYYY-MM-DD
        getFormatDate(year, month, currDay) {
            let day = currDay.content.toString().padStart(2, '0')
            return year + '-' + month + '-' + day
        },
        /**
         * 处理每个日期对应的样式
         */
        getClass (currMonth, currDay) {
            const {minDate, maxDate} = this
            let {year, month} = this.changeDate(currMonth.title)
            let currentDate = this.getFormatDate(year, month, currDay)
            let Festival = this.calendarFestival(currentDate) // 当前日是否是节日
            let todayDate = moment(new Date()).format('YYYY-MM-DD') // 当前日是否是今天
            let isDisable = currentDate > maxDate || currentDate < minDate // 当前日是否是不可选的
            let className = []
            // 如果开始日期和结束日期是相邻的两个日期，需要添加上间距
            let diff = 0
            if(this.endDate && this.startDate){
                diff = Math.abs(new Date(this.endDate).getTime() - new Date(this.startDate).getTime())
                diff = parseInt(diff / (1000 * 60 * 60 * 24))
            }
            if (Festival) {
                className.push(`${this.dayPrefix}-festival`)
            }
            if (isDisable) {
                className.push(`${this.dayPrefix}-disabled`)
            }
            if (currentDate === this.startDate) {
                if (diff < 2 && new Date(this.startDate).getDay !== 6) {
                    className.push(`${this.dayPrefix}-border-right`)
                }
                className.push(`${this.dayPrefix}-start-active`)
            }
            if (currentDate === this.endDate) {
                if (diff < 2 && new Date(this.startDate).getDay !== 0) {
                    className.push(`${this.dayPrefix}-border-left`)
                }
                className.push(`${this.dayPrefix}-end-active`)
            }
            if (currentDate > this.startDate && currentDate < this.endDate) {
                className.push(`${this.dayPrefix}-choose`)
            }
            if (currentDate === todayDate) {
                className.push(`${this.dayPrefix}-today`)
            }
            return className
        },
        // 选择日期时触发的方法
        chooseDate (monthData, chooseDay) {
            let {year, month} = this.changeDate(monthData.title)
            let {startDate, endDate} = this
            let chooseedDay = this.getFormatDate(year, month, chooseDay)
            // 处理开始结束日期的切换
            if (chooseDay.content) {
                if (startDate && endDate) {
                    this.startDate = chooseedDay
                    this.endDate = ''
                } else if (startDate) {
                    if (startDate > chooseedDay) {
                        this.endDate = startDate
                        this.startDate = chooseedDay
                    } else {
                        this.endDate = chooseedDay
                    }
                } else {
                    this.startDate = chooseedDay
                }
            }
        },
        getFestival (currMonth, currDay) {
            let {year, month} = this.changeDate(currMonth.title)
            let currentDate = this.getFormatDate(year, month, currDay)
            return this.calendarFestival(currentDate)
        },
        calendarFestival (date) {
            let {lunarFestival, solarFestival} = this
            let [year, month, day] = date.split('-')
            let {lYear, lMonth, lDay} = calendar.solar2lunar(year, month, day)
            let cdate = month + day
            let ldate = lMonth.toString().padStart(2, '0') + lDay.toString().padStart(2, '0')
            let CFestival = ((solarFestival || []).filter((item) => {
                return item[cdate]
            })[0] || {})[cdate] || ''
            let lFestival = ((lunarFestival  || []).filter((item) => {
                return item[ldate]
            })[0] || {})[ldate] || ''
            if (lFestival && CFestival) {
                return CFestival
            } else if (lFestival && !CFestival) {
                return lFestival
            } else if (!lFestival && CFestival) {
                return CFestival
            } else {
                return ''
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './calendar.scss';
</style>