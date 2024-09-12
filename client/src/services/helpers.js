export default class {
    static compare( a ,b ) {
        if(a !== b){
            return false;
        }
        else return true
    }
    static storeData(data){
        let result =localStorage.getItem('votes')
        console.log(result);
        if(!result){
            result =[]
        }
        else{
            result=[...JSON.parse(localStorage.getItem('votes'))]
        }
        result.push(data)
        // Convert the array to a Set to remove duplicates, then convert back to an array
        const uniqueArray = Array.from(new Set(result));

        localStorage.setItem('votes',JSON.stringify(uniqueArray))     
        return result
    }
}




   

