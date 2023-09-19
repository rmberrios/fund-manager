
export function parseQueryToInteger(queryParam: any) {

    if (typeof queryParam === "string") {
      return parseInt(queryParam)
    }
  
    if (typeof queryParam === "number") {
      return queryParam;
    }
  }