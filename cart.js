let tbody=document.querySelector("tbody");
class SessionItem{
    setCartProducts(productArray){
        sessionStorage.setItem("CartProducts",JSON.stringify(productArray));
    }
    getProducts(productArray){
        return JSON.parse(sessionStorage.getItem("addToCart"));
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
        products.forEach(eachProduct=>{
            result+=`<tr>
            <td>${eachProduct.id}</td>
            <td><img src=${eachProduct.img} alt=""></td>
            <td>${eachProduct.title}</td>
            <td>${eachProduct.price}</td>
            <td>${eachProduct.amount}</td>
            <td><button id="${eachProduct.id}" class="add">add</button></td>
            <td><button id="${eachProduct.id}" class="remove">remove</button></td>
        </tr>`
        });
        tbody.innerHTML=result;

    }

    async removeProducts(product){
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

    updateProducts(product){
        
    }
}



let show=new Ui();
show.showProducts(products);
let cartProducts=new CartProducts();
document.addEventListener('DOMContentLoaded',()=>{
cartProducts.getCartProducts()
.then(()=>{
    show.removeProducts();
    show.updateProducts();
})
})


