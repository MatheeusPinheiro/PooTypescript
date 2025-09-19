import {ClassRoom, Student} from './classes.js'

const btnAddClassRoom = document.getElementById('adicionarTurma') as HTMLButtonElement;
const btnAddStudent = document.getElementById('adicionarAlunos') as HTMLButtonElement;
const modal = document.querySelector('.modal') as HTMLElement;
const closeModal = document.querySelector('.closeModal') as HTMLElement;
const btnInserClassAndStudent =  document.getElementById('cadastrar') as HTMLButtonElement;



const classRoom = new ClassRoom(1, 'Academia do chefe')

console.log(classRoom)



//Botão para abrir o modal para cadastrar a classe
btnAddClassRoom.addEventListener('click', () => {
    modal.classList.toggle('show');
    hideStudentFields();

    btnInserClassAndStudent.addEventListener('click', (event) => {
        event.preventDefault();
        alert('testando')
    })

});

//Botão para abrir o modal para cadastrar os alunos
btnAddStudent.addEventListener('click', () => {
    modal.classList.toggle('show');
    showStudentFields()
})



// Ao clicar no icone de X fecha o modal
closeModal.addEventListener('click', () => {
    modal.classList.toggle('show');
    hideStudentFields();
});

// Ao clicar fora do modal fecha o modal
modal.addEventListener('click', (event) => {
    if(event.target === modal){
        modal.classList.remove('show');
        hideStudentFields();
    }
});

// Mostra os campos do cadastro de estudantes
function showStudentFields(){
    const fields = ['nome', 'idade', 'altura', 'peso'];
    fields.forEach(id => {
        const el = document.getElementById(id) as HTMLElement;
        el.style.display = 'flex';
    })
}

// Esconde os campos do cadastro de estudantes
function hideStudentFields(){
    const fields = ['nome', 'idade', 'altura', 'peso'];
    fields.forEach(id => {
        const el = document.getElementById(id) as HTMLElement;
        el.style.display = 'none';
    })
}