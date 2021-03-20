import'./style/index.less';

//先定义食物类Food
class Food{
    //定义一个属性表示食物所对应的元素
    element: HTMLElement;
    
    constructor(){
        //获取页面中的food元素并将其赋值给element
        this.element = document.getElementById('food')!;
    }

    get X(){
        return this.element.offsetLeft;
    }

    get Y(){
        return this.element.offsetTop;
    }

    change(){
        let top = Math.round(Math.random()*29)*10;
        let left = Math.round(Math.random()*29)*10;

        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    }
}

//测试代码
const food = new Food();
console.log(food.X, food.Y);
food.change();
console.log(food.X, food.Y);