function gettitle(){
    t = sessionStorage.getItem('title');
    return t;
}

function getprice(){
    p = sessionStorage.getItem('price');
    return p;
}

function getimg(){
    i = sessionStorage.getItem('img');
    return i;
}

t = gettitle();
p = getprice();
// i = getimg();

// data = i.split("/");

// var s;

// for(var j=0; j<data.length; j++){
//     if(data[j] === "images"){
//         s = data[j] + "/" +data[j+1];
//     }
// }

let table = document.querySelector("table");

if (t === null){
    function tablevalue(){
        return null;
    }
}else{
    function tablevalue(){
        let template = 
        `
            <tr>
                <td class="border-1">${t}</td>
                <td class="border-1">${p}</td>
            </tr>
        `;

        table.innerHTML += template;
    }

}
