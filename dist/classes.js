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
    setAddStudent(student) {
        if (student) {
            this.students.push(student);
        }
    }
    setRemoveStudent(id) {
        const index = this.students.findIndex(item => item.getId() === id);
        if (index !== -1) {
            this.students.splice(index, 1);
            return true;
        }
        return false;
    }
    getListStudents() {
        return this.students;
    }
    getNumStudents() {
        return this.students.length;
    }
    getMediaHeight() {
        if (this.students.length === 0) {
            return 0;
        }
        let sumHeight = 0;
        this.students.forEach(item => {
            sumHeight += Number(item.getHeight());
        });
        const media = sumHeight / this.students.length;
        return media;
    }
    getMediaWeight() {
        if (this.students.length === 0) {
            return 0;
        }
        let sumWeight = 0;
        this.students.forEach(item => {
            sumWeight += Number(item.getWeight());
        });
        const media = sumWeight / this.students.length;
        return media;
    }
    getMediaAge() {
        if (this.students.length === 0) {
            return 0;
        }
        let sumAge = 0;
        this.students.forEach(item => {
            sumAge += Number(item.getAge());
        });
        const media = sumAge / this.students.length;
        return media;
    }
}
export class Student {
    constructor(id, fullName, age, height, weight) {
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
        if (newFullName.length > 2) {
            this.fullName = newFullName;
        }
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
