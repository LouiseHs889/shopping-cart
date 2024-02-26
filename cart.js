let tbody=document.querySelector("tbody");
let resultTotalhtml=document.querySelector(".reaultTotal")
let total=0;
class SessionItem{
    setCartProducts(productArray){
        sessionStorage.setItem("CartProducts",JSON.stringify(productArray));
    }
    getProducts(productArray){
        return JSON.parse(sessionStorage.getItem("addToCart"));
    }
}

class PayTotal{
    updateTotal(updateAmount,updateId){
        let products=JSON.parse(sessionStorage.getItem("addToCart"));
        let updateAllProductsTotal=0;
        
        products.map(item=>{
            if(item.id===updateId){
                item.amount=updateAmount;
            }
        })

        console.log(products);
        sessionStorage.setItem("addToCart",JSON.stringify(products));
        let htmlTotal=document.querySelector('.total');
        //updateAllProductsTotal=parseInt(htmlTotal.innerText);
        products.forEach(item=>{
            updateAllProductsTotal+=item.amount*item.price;
        })

        
        
        htmlTotal.innerText=updateAllProductsTotal;

    }
}

let sessionItem=new SessionItem();
let products=JSON.parse(sessionStorage.getItem("addToCart"));

class CartProducts{
    async getCartProducts(){
        return JSON.parse(sessionStorage.getItem("addToCart"));
    }
   

}
class Ui{
    async showProducts(products){
        
        let result="";
        let resultTotal="";
        products.forEach(eachProduct=>{
            result+=`<tr>
            <td>${eachProduct.id}</td>
            <td><img src=${eachProduct.img} alt=""></td>
            <td>${eachProduct.title}</td>
            <td>${eachProduct.price}</td>
            <td>
            <div class="quantity">
                <input type="button" value="-" class="minus">
                <input type="text" name="" id=""  value="${eachProduct.amount}"  />
                <input type="button" value="+" class="plus">
            </div>
            </td>
            
            <td><button id="${eachProduct.id}" class="remove">remove</button></td>
        </tr>`

        total+=eachProduct.price*eachProduct.amount;
        
        }); 
        resultTotal+=`<h3>Total:</h3><h3 class="total"> ${total}</h3></h3>`

        tbody.innerHTML=result;
        resultTotalhtml.innerHTML=resultTotal;

    }

    async removeProducts(){
    let removeProduct=document.querySelectorAll('.remove');
    removeProduct.forEach(rp=>rp.addEventListener('click',removeItem));
        function removeItem(e){
            let removeObject=e.target.parentNode.parentNode;
            let tid=e.target.id;
            removeObject.remove();
            products=products.filter(item=> item.id!==tid);
            sessionStorage.setItem("addToCart",JSON.stringify(products));
            console.log(sessionStorage.getItem("addToCart"));
        }
    }
    

    async updateProducts(){
        let payTotal=new PayTotal();
        let plus=document.querySelectorAll('.plus');
        plus.forEach(p=>p.addEventListener('click',addamount));
        let minus=document.querySelectorAll('.minus');
        minus.forEach(m=>m.addEventListener('click',minusamount));
        function addamount(e){
            let getPlus=e.target.previousElementSibling;
            let plus=parseInt(getPlus.value);
            let id=e.target.parentNode.parentNode.parentNode.querySelector(':first-child').innerHTML;
            console.log(id);
            
            plus+=1;
            getPlus.value=plus;
            payTotal.updateTotal(getPlus.value,id);

         
        }

        function minusamount(e){
            let getminus=e.target.nextElementSibling;
            let mminus=parseInt(getminus.value);
            if(mminus>1){
                mminus-=1;
                getminus.value=mminus;
            }else{
                mminus=1;
                getminus.value=mminus;
            }
            
            let id=e.target.parentNode.parentNode.parentNode.querySelector(':first-child').innerHTML;
            payTotal.updateTotal(getminus.value,id);
        }
}
    
}



let show=new Ui();
show.showProducts(products);
let cartProducts=new CartProducts();
document.addEventListener('DOMContentLoaded',()=>{
cartProducts.getCartProducts()
.then(()=>{
    show.updateProducts();
    show.removeProducts();
    
})
})


