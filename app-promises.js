const users =[{
    id:1,
    name:'andrew',
    schoolID:101
},{
    id:2,
    name:'andrew2',
    schoolID:102
},{
    id:3,
    name:'andrew3',
    schoolID:103
},{
    id:4,
    name:'andrew4',
    schoolID:104
}];
const grades = [{
    id:2,
    grade:88,
    schoolID:102
},{
    id:1,
    grade:98,
    schoolID:101
},{
    id:3,
    grade:84,
    schoolID:103
},{
    id:4,
    grade:84,
    schoolID:104
}];

const getUser=(id) => {
    return new Promise((resolve,reject) => {
        const user  = users.find((user) => {
            return user.id === id
        });
        if(user){
            resolve(user)
        }else{
            reject(`Unable to find user by id of ${id}`)
        }
    })
}

const getGrades=(schoolId) => {
    return new Promise((resolve,reject) => {
        resolve(grades.filter((grade)=> grade.schoolID == schoolId  ));
    })
};

const getStatus =(userID) => {
    let user
    return getUser(userID).then((tempuser)=> {
    user =tempuser    
    return getGrades(user.schoolID);
    }).then((grades) =>{    
        let average = 0
        if(grades.length>0){
            average = grades.map((grade) =>grade.grade).reduce((a,b) => a+b)/grades.length
        }
        console.log(average);
        return `${user.name} has a ${average}% in class`
    })
}

const getStatusAlt = async (userId) => {
    const user = await getUser(userId)
    const grades = await getGrades(user.schoolID)
    let average = 0
    if(grades.length>0){
        average = grades.map((grade) =>grade.grade).reduce((a,b) => a+b)/grades.length
    }
    console.log(average);
    return `${user.name} has a ${average}% in class`
    console.log(user, grades)
}
//console.log(getStatusAlt())

getStatusAlt(2).then((name) =>{
    console.log(name)
}).catch((e) => {
    console.log(e)
})

// getUser(1).then((user) =>{
//     console.log(user)
// }).catch((e) => {
// console.log(e)
// })

// getStatus(2).then((user) =>{
//     console.log(user)
// }).catch((e) => {
// console.log(e)
// })

// getGrades(104).then((user) =>{
//     console.log(user)
// }).catch((e) => {
// console.log(e)
// })
