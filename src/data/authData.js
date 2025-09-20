// usei um conversor online de Base64 (ou até o console do navegador btoa('texto')) para fazer as conversões

// As credenciais agora estão ofuscadas usando Base64.
// Elas não são legíveis diretamente no código-fonte.
const authorizedUsersEncoded = [
  { email: 'YW5kcmVAYW5kcmUuY29t', password: 'YW5kcmU=' },      // andre@andre.com | andre
  { email: 'ZGVuaXNlQGRlbmlzZS5jb20=', password: 'ZGVuaXNl' },  // denise@denise.com | denise
  { email: 'a2VubmVkeUBrZW5uZWR5LmNvbQ==', password: 'a2VubmVkeQ==' }, // kennedy@kennedy.com | kennedy
];

export default authorizedUsersEncoded;