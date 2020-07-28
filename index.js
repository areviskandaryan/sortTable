
const SORTING_ORDERS = {
    random: "random",
    asc: "asc",
    desc: "desc",
};




const sortStudents = (students, order) => {
    if (order === SORTING_ORDERS.random) {
        return students;
    }

    // @TODO: refactor
    return students.slice().sort((a, b) => {
        if (order === SORTING_ORDERS.asc) {
            return a.age > b.age ? 1 : -1;
        } else {
            return a.age > b.age ? -1 : 1;
        }
    });
};



const createTableRow = (items) => {
    const tr = document.createElement("tr");

    items.forEach((value) => {
        const td = document.createElement("td");
        td.textContent = value;
        tr.append(td);
    });

    return tr;
};


const table = document.querySelector("#sortable-table");
const tableBody = table.querySelector("tbody");
const ageCol = table.querySelector("#sortable-table-age");

const state = {
    students: [
        {
            name: "Gohar",
            age: 30,
            grade: 8,
        },
        {
            name: "Vrezh",
            age: 20,
            grade: 8.7,
        },
        {
            name: "Arev",
            age: 50,
            grade: 10,
        },
        {
            name: "Elida",
            age: 40,
            grade: 9.7,
        },
    ],
    order: SORTING_ORDERS.random, // 'random', 'asc', 'desc' ⬆️⬇️
};



const render = (state) => {
    tableBody.innerHTML = "";

    state.students.forEach(({ name, age, grade }) => {
        const row = createTableRow([name, grade, age]);

        tableBody.append(row); // warning
    });

    const sortIcon = ageCol.querySelector(".sort-icon");

    switch (state.order) {
        case SORTING_ORDERS.random:
            sortIcon.textContent = "➡️";
            break;
        case SORTING_ORDERS.asc:
            sortIcon.textContent = "⬆️";
            break;
        case SORTING_ORDERS.desc:
            sortIcon.textContent = "⬇️";
            break;
        default:
            throw new Error(`${state.order} is not valid sorting command`);
    }
};

render(state);

ageCol.addEventListener("click", (evt) => {
    switch (state.order) {
        case SORTING_ORDERS.random:
            state.order = SORTING_ORDERS.asc;
            break;
        case SORTING_ORDERS.asc:
            state.order = SORTING_ORDERS.desc;
            break;
        case SORTING_ORDERS.desc:
            state.order = SORTING_ORDERS.asc;
            break;
        default:
            throw new Error(`${state.order} is not an valid order!`);
    }

    state.students = sortStudents(state.students, state.order);

    render(state);
});



let  newStudent = {
    name: "",
    grade: "",
    age: "",

}


const div = document.createElement("div")
const  body = document.querySelector("body")

let Fn=({name,grade,age})=>{
    Object.keys(newStudent).forEach( item=> {
        let input = document.createElement("input");
        div.append(input)
        input.addEventListener("input", ()=>{
            newStudent[item] = input.value
        })
    })

    body.append(div)
}
Fn(newStudent);

let validate=({name,grade,age})=>{

    return [name,grade,age].every(item => item.trim())
}


document.querySelectorAll("input")[2].addEventListener("keypress", (e) => {
    if (e.key === "Enter") {

        if (!validate(newStudent)) {
            throw new Error("input valid values!")
        } else {
            state.students.push(newStudent)
            render(state)
        }
    }

})























































