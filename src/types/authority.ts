export interface AuthorityType {
  authorityId: number;
  authorityName: string;
  parentId: number;
  dataAuthorityId: number[];
  children: AuthorityType[] | null;
  menus: [];
  defaultRouter: string;
}
