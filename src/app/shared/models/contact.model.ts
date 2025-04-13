export interface Contacts{
  data?: Contact[];
  pagination?: Pagination;
}


export interface Contact{
  user_id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  photo?: string;
}


export interface Pagination{
  page?: string;
  pageSize?: string;
  total?: number;
}


