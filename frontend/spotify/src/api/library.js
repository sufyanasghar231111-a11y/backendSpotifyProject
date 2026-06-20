import api from "./axios";


export const getLibraryData=()=>{
    return api.get('/library/getLibrary')
};

export const updateLibraryData=(id)=>{
    return api.patch(`/library/addTolab/${id}`)
}

export const deleteLibraryData=(id)=>{
    return api.delete(`/library/deleteLab/${id}`)
}