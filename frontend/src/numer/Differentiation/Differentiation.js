import { evaluate,derivative } from "mathjs";

export class Differentiation{
    constructor(fx,x,h,diff,error,direction){
        this.state = {
            fx:fx,
            x:x, //find x
            h:h,
            diff:diff, //1-4 
            error: error, //h^ : 1-2 | central 2-4
            direction,direction // forward 1 backward 2 central 3
        }
    }

    F(x){
        return evaluate(this.state.fx,{x:x})
    }

    calculate(){
        const {fx,x,h,diff,error,direction} = this.state
        if (error === 1 || (direction === 3 && error === 2)){ //รอแก้ central เรื่อง i+... , i- ...
            let c = []
            switch(diff){
                case 1: c = [1,1]; break;
                case 2: c = [1,2,1]; break;
                case 3: c = [1,3,3,1]; break;
                case 4: c = [1,4,6,4,1]; break;
            }
            let result = 0
            for (let i=0;i<=diff;i++){
                let temp = 0
                if (direction === 1) temp = x+(diff-i)*h //มากไปน้อย บวกมากไปบวกน้อย
                if (direction === 2) temp = x-i*h //มากไปน้อย ลบน้อยไปลบมาก
                result += (Math.pow(-1,i)*c[i]*this.F(temp))
            }

            if (error === 1) { result /= Math.pow(h,diff) }
            else { result /= Math.pow(h, diff) * (diff % 2) ? 1 : 2 } //diff คู่ปกติ คี่คูณ 2
        } 

        if (error === 2 && direction != 3){
            let c = []
            switch(diff){
                case 1: c = [1,4,3]; break;
                case 2: c = [1,4,5,2]; break;
                case 3: c = [3,14,24,18,5]; break;
                case 4: c = [2,11,24,26,14,3]; break;
            }
            let result = 0
            for (let i=0;i<=diff+1;i++){
                let temp = 0
                if (direction === 1) {
                    temp = x+(diff-i)*h //มากไปน้อย บวกมากไปบวกน้อย
                    result += (Math.pow(-1,i)*c[i]*this.F(temp))
                } 
                if (direction === 2) {
                    temp = x-i*h //มากไปน้อย ลบน้อยไปลบมาก
                    result += (Math.pow(-1,i+1)*c[diff+1-i]*this.F(temp)) //สลับ +- และ กลับสปสเรียงหลังมาหน้า
                }
            }

            result /= Math.pow(h, diff) * (diff % 2) ? 1 : 2 //diff คู่ปกติ คี่คูณ 2
        } 

        if (error === 4 && direction === 3){ //รอแก้ central เรื่อง i+... , i- ...
            let c = [] , h = [12,12,8,6]
            switch(diff){
                case 1: c = [1,8,8,1]; break;
                case 2: c = [1,16,30,16,1]; break;
                case 3: c = [1,8,13,13,8,1]; break;
                case 4: c = [1,12,39,56,39,12,1]; break;
            }
            let result = 0
            for (let i=0;i<=diff+1;i++){
                let temp = 0
                temp = x+(diff-i)*h //มากไปน้อย บวกมากไปบวกน้อย
                result += (Math.pow(-1,i)*c[i]*this.F(temp))
            }

            result /= Math.pow(h, diff) * h[diff-1] //diff คู่ปกติ คี่คูณ 2
        }
    }
}