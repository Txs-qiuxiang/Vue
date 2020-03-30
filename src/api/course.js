export function getCourses() {
    return new Promise(resove => {
        setTimeout(() => {
            resove([{
                name: '小说'
            }, {
                name: '计算机'
            }])
        }, 2000);
    })
}