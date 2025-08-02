//life cycle of a k6 test

//1. initialization
import sleep from 'k6';


//2. settings
export const options = {
    vus: 1,
    duration: '10s'
}

//3. execution // vu code
export default function(){
    console.log("testando o k6");
    sleep(1);
}

//4. disassembly
export function teardown(data){
    console.log(data)
}