export class ClassRoom {

    private students: Student[] = [];

    constructor(
        private id: number,
        private name: string,
    ) { }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    setAddStudent(student: Student): void {
        if (student) {
            this.students.push(student)
        }
    }

    setRemoveStudent(id: number){
        const index = this.students.findIndex(item => item.getId() === id);

        if(index !== -1){
            this.students.splice(index, 1);
            return true;
        }
        return false;
    }

    getListStudents() {
        return this.students;
    }

    getNumStudents(): number {
        return this.students.length;
    }

    getMediaHeight() {
        if (this.students.length === 0) {
            return 0;
        }

        let sumHeight = 0;
        this.students.forEach(item => {
            sumHeight += Number(item.getHeight())
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
            sumWeight += Number(item.getWeight())
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
            sumAge += Number(item.getAge())
        });

        const media = sumAge / this.students.length;
        return media;
    }
}


export class Student {

    constructor(
        private id: number,
        private fullName: string,
        private age: number,
        private height: number,
        private weight: number
    ) { }


    getId() {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getFullName() {
        return this.fullName;
    }

    setFullName(newFullName: string) {
        if (newFullName.length > 2) {
            this.fullName = newFullName;
        }
    }

    getAge() {
        return this.age;
    }

    setAge(newAge: number) {
        this.age = newAge;
    }

    getHeight() {
        return this.height;
    }

    setHeight(newHeight: number) {
        this.height = newHeight;
    }

    getWeight() {
        return this.weight;
    }

    setWeight(newWeight: number) {
        this.weight = newWeight;
    }
}