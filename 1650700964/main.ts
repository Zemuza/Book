interface Book {
    id:number;
    title:string;
    author:string;
    genre:Genre ;
    publishedyear:number;
};

enum Genre{
    Fiction,
    NonFiction,
    Fantasy,
    Learning,
};
interface AvailableBook extends Book{
    availability:"availabel"
}
interface CheckedOutBook extends Book{
    availability:"checked out"
    dueDate?:string;
}

type bookState = AvailableBook | CheckedOutBook;

class Library<U extends bookState>{
private inventory:U[] =[];

 AddBook(book:U):void{
    this.inventory.push(book);
    console.log(`${(book as any).title} by: ${(book as any).author} has been added to inventory`);
};

 Listbooks():void{
    if(this.inventory.length === 0){
        return console.log("No book in iventory now");
    }
    console.log("Listing all book the inventory:")
    this.inventory.forEach((book)=>{
        console.log(`${book.id}, title:${(book as any).title} , author: ${(book as any).author}`);
    })
};

 searchbook<k extends keyof U>(key: k,value: U[k]): U[]{
    return this.inventory.filter((book)=> book[key]=== value);
}

 updatebook(id: number,update:Partial<U>):void{
    const book = this.inventory.find(a=>a.id === id)
    if (!book){
        return console.log(`Book with ID ${id} not found`);
    }
    Object.assign(book,update);
    console.log(`The Book with ID ${id} has been update.`)
}




 deletebook(id:number):void{
const index = this.inventory.findIndex((book)=> book.id === id);
if (index !== -1){
    this.inventory.splice(index,1);
    console.log(`The Book with ID ${id} has been Deleted.`)
} else{
    console.log(`Book with ID ${id} not found`)
}
}
checkoutBook(id:number,dueDate:string):void{
    const index = this.inventory.findIndex((box)=>box.id === id)
if (index!== -1 &&this.inventory[index].availability==="availabel"){
    const CheckedOutBook: CheckedOutBook ={
        ...this.inventory[index],
        availability:"checked out",
        dueDate,
    };
    this.inventory[index] = CheckedOutBook as U;
    console.log(`Book with ID ${id} has been checked out and is due on ${dueDate}.`);
    }else{
        console.log(`Book with ID ${id} is not found`);
    }
}

ReturnBook(id:number):void{
    const index = this.inventory.findIndex((box)=>box.id === id)
if (index!== -1 &&this.inventory[index].availability==="checked out"){
    const CheckedOutBook: AvailableBook ={
        ...this.inventory[index],
        availability:"availabel",
    };
    this.inventory[index] = CheckedOutBook as U;
    console.log(`Book with ID ${id} has been returned and is now available.`);
    }else{
        console.log(`Book with ID ${id} is either not  checked out or  not found`);
    }
}
}
//------------------------------------------
const library = new Library<bookState>();

library.AddBook({
    id:1,
    title:"ABC",
    author:"ไม่รู้",
    genre:Genre.Learning,
    publishedyear:2010,
    availability:"availabel",

});
library.AddBook({
    id:2,
    title:"บักแว่นสายฟ้า",
    author:"Ab โลริ่ง",
    genre:Genre.Learning,
    publishedyear:2011,
    availability:"availabel",

});
library.AddBook({
    id:3,
    title:"DAndD",
    author:"399",
    genre:Genre.Learning,
    publishedyear:2016,
    availability:'checked out',

});


library.Listbooks();
library.updatebook(1,{title:"BBB"});
library.Listbooks();
const searchResult = library.searchbook("title","บักแว่นสายฟ้า");
console.log("Books found by title:",searchResult);
library.deletebook(4);
library.Listbooks();
library.checkoutBook(1,"2024-10-01");
library.Listbooks();
library.ReturnBook(1);
library.ReturnBook(2);
library.Listbooks();