export class ClassRoom {

    private students: Student[] = [];

    constructor(
        private id: number,
        private name: string,
    ){}

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    public addStudent(student: Student): void{
        if(student){
            this.students.push(student)
        }
    }
}


export class Student {

    constructor(
        private id: number,
        private fullName: string,
        private age: number,
        private height: number,
        private weight: number
    ){
        this.id = id
        this.fullName = fullName
        this.age = age
        this.height = height
        this.weight = weight
    }

    getId(){
        return this.id;
    }

    setId(id: number){
        this.id = id;
    }

    getFullName(){
        return this.fullName;
    }

    setFullName(newFullName: string){
        this.fullName = newFullName;
    }

    getAge(){
        return this.age;
    }

    setAge(newAge: number){
        this.age = newAge;
    }

    getHeight(){
        return this.height;
    }

    setHeight(newHeight: number){
        this.height = newHeight;
    }

    getWeight(){
        return this.weight;
    }

    setWeight(newWeight: number){
        this.weight = newWeight;
    }
}