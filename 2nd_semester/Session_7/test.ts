let name: string = "넥스트";
let age: number = 13;
let isAdult = false;
let hobbies = ["개발", "창업"];

function greet(name: string, age: number | undefined): string {
    return `안녕하세요, ${name}님! (${age ?? "나이 미상"}세)`;
}

function checkAge(age: number | undefined): boolean {
    if(age){
        return age >= 18;
    }
    return false;
}

interface Person {
    name: string;
    age?: number;
    isAdult: boolean;
    hobbies: string[];
}

const person1: Person = {
    name: name,
    age: age,
    isAdult: isAdult,
    hobbies: hobbies,
};

const person2: Person = {
    name: name + "짱",
    isAdult: !isAdult,
    hobbies: hobbies.concat("농구"),
};


console.log(greet(person1.name, person1.age));
console.log(`성인 여부: ${checkAge(person1.age) ? "성인" : "미성년자"}`);
console.log(`취미: ${person1.hobbies.join(", ")}`);

console.log(greet(person2.name, person2.age));
