export interface AuthorityType {
  authorityId: number;
  authorityName: string;
  parentId: number;
  dataAuthorityId: number[];
  showMenuIds: string;
  children: AuthorityType[] | null;
  menus: [];
  defaultRouter: string;
}
