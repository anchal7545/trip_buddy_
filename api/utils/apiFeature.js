class ApiFeature {
     constructor(query,queryStr){
          this.query=query;
          this.queryStr=queryStr 
     }

    search(){
        const keyword = this.queryStr.keyword ? {
               name:{
                 $regex:this.queryStr.keyword,
                 $options:"i"
               }
        } : {}
        this.query = this.query.find({...keyword})
        return this 
    } 

     filter(){
        const queryCopy = {...this.queryStr}
        const removeFields = ["keyword"]
        removeFields.forEach((key)=> delete queryCopy[key])
        
        
        if(!queryCopy?.startDate?.gte || !queryCopy?.startDate?.lte) {
           this.query = this.query.find()
           return this
        }
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=> `$${key}`)
        this.query = this.query.find(JSON.parse(queryStr))
        return this
     }

}

export default ApiFeature