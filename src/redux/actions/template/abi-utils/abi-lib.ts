import Web3Utils from 'web3-utils';

enum listAbiTypes {
    STRING = "string",
    STRING_ARRAY = "string[]",
    INTEGER = "uint",
    INTEGER_ARRAY = "uint[]",
    ADDRESS = "address",
    ADDRESS_ARRAY = "address[]",
    BOOL = "bool",
}

export const getElementsAbi = (params:Object) => {
    return Object.keys(params).map((val,ind) =>{
      let value = params[val]
      let valueType = typeof(value)
       return getElementTypeAbi(valueType, value)
    }).reduce((x:any,xs:any) =>{
      x[0].push(xs.typeAbi)
      x[1].push(xs.valueAbi)
      return x
    },[[],[]])
}

const getElementTypeAbi = (valueType:String, value:any) : {typeAbi:String, valueAbi:any} => {
    let abiType: String = ""
    let abiValue:any = value
    let isFloat = (n:any) => {
      return Number(n) === n && n % 1 !== 0;
    }
    
    if (valueType === "string"){
      
      if (Web3Utils.isAddress(value)){
        abiType = listAbiTypes.ADDRESS
      }else if(isFloat(value)){
        abiType = listAbiTypes.STRING
      }else{
        abiType = listAbiTypes.STRING
      }
      
    }else if (valueType === "number"){
      abiType = listAbiTypes.INTEGER
      if(isFloat(value)){
        abiValue = Web3Utils.toWei(value.toString())
      }
  
    }else if (valueType === "object"){
      if (Array.isArray(value)){
        let typeVar:String = value.map((val,_) => {
          let valType = typeof(val)
          let {typeAbi, valueAbi} = getElementTypeAbi(valType, val)
          return typeAbi
        }).reduce((x:Array<any>,xs:any,i)=>{
          if(x.indexOf(xs) < 0){ x.push(xs) }
          return x
        },[])[0]
        abiType = `${typeVar}[]`
      }
      
    }else if (valueType === "boolean"){
      abiType = listAbiTypes.BOOL
    }
    
    return {
        typeAbi:abiType, 
        valueAbi:abiValue
    }
}
  