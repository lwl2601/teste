function Input(props){
    return (
 <input
   className="border border-slate-300 outline-slate-500  text-center py-2 rounded-md"
        //pega atomaticamente as informações
   {...props}
 />
);
}

export default Input