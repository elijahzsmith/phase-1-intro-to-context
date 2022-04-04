// Your code here
const createEmployeeRecord = (employeeInfoArr) => {
    const employeeObj = {
        firstName: employeeInfoArr[0],
        familyName: employeeInfoArr[1],
        title: employeeInfoArr[2],
        payPerHour: employeeInfoArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeObj
}

const createEmployeeRecords = (arrOfArrs) => {
    const employeesArrObj = []
    for (let arr of arrOfArrs) {
        employeesArrObj.push(createEmployeeRecord(arr))
    }
    //console.log(employeesArrObj)
    return employeesArrObj
}

const createTimeInEvent = (empRecordObj, dateStamp) => {
    const hourNumIn = parseInt(dateStamp.substr(-4))
    const timeInInfo = {
        type: "TimeIn",
        hour: hourNumIn,
        date: dateStamp.substr(0, 10)
    }
    empRecordObj.timeInEvents.push(timeInInfo)
    //console.log(empRecordObj)
    return empRecordObj
}

const createTimeOutEvent = (empRecordObj, dateStamp) => {
    const hourNumOut = parseInt(dateStamp.substr(-4))
    const timeOutInfo = {
        type: "TimeOut",
        hour: hourNumOut,
        date: dateStamp.substr(0, 10)
    } 
    empRecordObj.timeOutEvents.push(timeOutInfo)
    return empRecordObj
}

const hoursWorkedOnDate = (empRecordObj, dateStamp) => {
    const inEvent = empRecordObj.timeInEvents.find((e) => e.date === dateStamp)
    const outEvent = empRecordObj.timeOutEvents.find((e) => e.date === dateStamp)

    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = (empRecordObj, dateStamp) => {
    return hoursWorkedOnDate(empRecordObj, dateStamp) * empRecordObj.payPerHour
}

const allWagesFor = (empRecordObj) => {
    let availableDate = empRecordObj.timeInEvents.map(timeCard => timeCard.date)
   // console.log(availableDate)
    let payRoll = availableDate.reduce((aggregate, dateStamp) => aggregate + wagesEarnedOnDate(empRecordObj, dateStamp), 0)
    //console.log(payRoll)
    return payRoll
    //console.log(timeCard.date)
}

const calculatePayroll = (arrOfEmpObjs) => {
    //console.log(arrOfEmpObjs)

        let that = arrOfEmpObjs.map(obj => allWagesFor(obj) )

        return that.reduce((aggregate, current) => aggregate + current, 0)


    }
    
        // let allWages = allWagesFor(arr)
        // console.log("All wages: " + allWages)
        // return allWages.reduce((aggregate, current) => aggregate + current, 0)
    

    // add total hours worked by each employee
    // add pay per hour from each employee
    // multiply hours and pay
    
    // returns sum of pay owed to all employees for all dates, as a number
    // using wagesEarnedOnDate, accumalate the value of all dates woked by the employee in the record used as context. Amount should be returned as a number.
