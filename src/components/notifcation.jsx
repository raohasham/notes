const notification = ({message})=>{
    if(message===null){
        return null
    }
    else
    {
        <div className="error">
            {message}
        </div>
    }

}
export default notification