interface st{
    name:string;
    class:string;
    age:number;
}
let obj = {
    name:'shahmir',
    class:'2B',
    age:23
}

function print(key: keyof st): void {
    console.log(obj[key]);

}

print("name")