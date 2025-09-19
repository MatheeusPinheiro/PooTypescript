export class ClassRoom {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.students = [];
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    addStudent(student) {
        if (student) {
            this.students.push(student);
        }
    }
}
export class Student {
    constructor(id, fullName, age, height, weight) {
        this.id = id;
        this.fullName = fullName;
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.id = id;
        this.fullName = fullName;
        this.age = age;
        this.height = height;
        this.weight = weight;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getFullName() {
        return this.fullName;
    }
    setFullName(newFullName) {
        this.fullName = newFullName;
    }
    getAge() {
        return this.age;
    }
    setAge(newAge) {
        this.age = newAge;
    }
    getHeight() {
        return this.height;
    }
    setHeight(newHeight) {
        this.height = newHeight;
    }
    getWeight() {
        return this.weight;
    }
    setWeight(newWeight) {
        this.weight = newWeight;
    }
}
