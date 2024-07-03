export interface IRoles{
    "Rolenames": string
    "Menus": string
}



// export interface IResp_Menus{
//     Menuid?: number,
//     Parent_order?: number,
//     Parent_name?: string,
//     Parent_icon?: string,
//     Parent_url?: string,
//     Parent_badge?: string,
//     Childlevel1_order?: number,
//     Childlevel1_name?: string,
//     Childlevel1_url?: string,
//     Childlevel1_icon?: string,
//     Childlevel1_badge?: string,
//     Childlevel2_order?: number,
//     Childlevel2_name?: string,
//     Childlevel2_url?: string,
//     Childlevel2_icon?: string,
//     Childlevel2_badge?: string,
//     isEnabled?:boolean
// }


export interface IResp_Menus {
  Myid: number;
  Parentid: number;
  Mainmenu: string;
  Menu_name: string;
  Menu_icon: string;
  Menu_url: string;
  Menu_badge: string;
  Menu_disabled: number;
  Menu_order: number;
  isEnabled?:boolean
}

export interface IReq_Rolename{
    Rolenames : string 
}


export interface IRes_Selectedmenus{
  Rolenames: string;
  Menus: string;
}