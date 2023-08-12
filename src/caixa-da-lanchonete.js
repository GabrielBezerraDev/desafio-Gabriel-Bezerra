class CaixaDaLanchonete {

    products = [["cafe","Café","3.00"],["chantily","Chantily (extra do Café)","1.50","suco","Suco Natural","6.20"],["sanduiche","Sanduíche","6.50"],
    ["queijo","Queijo","2.00"],["salgado","Salgado","7.25"],["combo1","1 Suco 1 Sanduiche","9.50"],["combo2","1 Café 1 Sanduíche","7.50"]];
    value = 0;
    queijoValid = false;
    chantilyValid = false;
    validPay = ["dinheiro","debito","credito"];

    monetaryTransaction = {
        dinheiro: function(value){
            return value-((value*5)/100)
        },

        credito: function(value){
            return value+((value*3)/100)
        }
    }

    checkItens(itens){
        for(let i = 0; i < itens.length; i++){
            let queijo = true;
            let cafe = true;
            let inputUser = this.separateInput(itens[i]);
            let product = inputUser[0];
            let amount = Number(inputUser[1]);
            if(!product || typeof product !== "string"){
                this.purchaseError("Não há itens no carrinho de compra!");
                return false;
            }
            if(amount <= 0 || amount === NaN){
                this.purchaseError("Quantidade inválida!");
                return false;
             }
             for(let j = 0; j < this.products.length; j++){
              if(product !== this.products[j][0] && j === this.products.length-1){
                  this.purchaseError("Item inválido!");
                  return false;
              }
              if(product === this.products[j][0]){
                break;
              }
             }
            if(product === "queijo"){
             queijo = this.checkMainProduct("sanduiche",itens);
             this.queijoValid = true;
            }
            if(product === "chantily" && !this.chantilyValid){
             cafe = this.checkMainProduct("cafe",itens);
             this.chantilyValid = true;
            }
            if(!queijo || !cafe){
                return false;
            }
            this.value += this.getPrice(product)*amount;
            console.log("Valor atual: "+this.value);
        }      
        return true;
    }

    checkMethod(metodoDePagamento){
        let payingOkay = true;
        for(let i = 0; i < this.validPay.length; i++){
            if(metodoDePagamento !== this.validPay[i] && i === this.validPay.length-1){
                this.purchaseError("Forma de pagamento inválida!");
                payingOkay = false;
            }
            if(metodoDePagamento === this.validPay[i]){
                break;
              }
        }
        return payingOkay;
    }

    getPrice(product){
        for(let i = 0; i < this.products.length; i++){
            if(this.products[i][0] === product){
                return Number(this.products[i][2]);
            }
        }
        this.purchaseError("Item inválido!");
    }

    purchaseError(error){
        console.log(error);
        return;
    }

    checkMainProduct(requiredItem,itens){
        let okayProduct = true;
        for(let j = 0; j < itens.length; j++){
            let mainProduct = this.separateInput(itens[j])[0];
            if(mainProduct !== requiredItem && j === itens.length-1){
                this.purchaseError("Item extra não pode ser pedido sem o principal");
                okayProduct = false;
            }
            if(mainProduct === requiredItem ){
                break;
            }
        }
        return okayProduct;
    }

    separateInput(itensInput){
        return [itensInput.split(",")[0],itensInput.split(",")[1]]
    }

    purchaseValidation(metodoDePagamento,itens){
        return this.checkItens(itens) && this.checkMethod(metodoDePagamento) ? true : false;
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        let purchaseOkay = false;
         purchaseOkay = this.purchaseValidation(metodoDePagamento,itens);
         if(!purchaseOkay) return;
        if(metodoDePagamento === "dinheiro" || metodoDePagamento === "credito"){
            this.value = this.monetaryTransaction[metodoDePagamento](this.value);
        }
        console.log("Valor a pagar: R$ "+this.value.toFixed(2));
        return `R$ ${this.value.toFixed(2)}`;
    }

}
const compra = new CaixaDaLanchonete();
compra.calcularValorDaCompra("debito",["chantily,4","queijo,5","sanduiche,1","cafe,3","combo1,2"]);

