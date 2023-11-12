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
i = getimg();

data = i.split("/");

var s;

for(var j=0; j<data.length; j++){
    if(data[j] === "images"){
        s = data[j] + "/" +data[j+1];
    }
}

let table = document.querySelector("#root");

if (t === null){
    function tablevalue(){
        return null;
    }
}else{
    function tablevalue(){
        let template = 
        `   
            <tr>
                <td width="150"><img src="${s}" class="w-50"></td>
                <td width="360">${t}</td>   
                <td width="150">${p}</td>
                <td width="70"><i class="fa fa-trash-o cart-remove"></i></td>
            </tr>
        `;

        table.innerHTML += template;

        var cartContent = document.getElementsByClassName("cart-content")[0];
        var cartBoxes = cartContent.getElementsByClassName("cart-box");

    }

}
