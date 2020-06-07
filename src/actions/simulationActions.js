export const LoadQueryMetaData = (queryMetaData) => {
    return (dispatch => {
        return dispatch({
            type: 'LOADQUERYMETADATA',
            queryMetaData: queryMetaData
          });
    })
}