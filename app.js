//create a button
const btn = document.querySelector('#button');
const msg = document.querySelector("#message"); //for showing message

//when user click on button we are gonna call a function
btn.onclick = function(){

    //when user clicks button we need to create a promise
    const promise = new Promise((resolve, reject)=>{
        const request = new XMLHttpRequest;
        request.open('GET', 'https://api.icndb.com/jokes/random');
        request.onload = () =>{
            if(request.status === 200){
                resolve(request.response);
            }
            else{
                reject(Error(request.statusText)); //when the status is not 200 we are gonna rejected
            }
        };
        //when some error
        request.onerror =()=>{
            reject(Error('Error frtching data'));
        }

        request.send();
    });

    promise.then((data) => {
        console.log('Got data! Promise Executed');
        const result = JSON.parse(data).value.joke; //storing data in result
        msg.innerHTML = result;
    },
    //if there is any error then
    (error) => {
        console.log('Promise rejected')
        console.log(error.message)
    }
    )

}