import App from '../../App.vue'

describe('用户登录组件测试', () => {
  beforeEach(() => {
    cy.mount(App);
  });

  it('输入用户名和密码并成功登录', () => {
    // 输入用户名和密码
    cy.get('input[placeholder="请输入用户名"]').type('admin');
    cy.get('input[placeholder="请输入密码"]').type('123456');
    cy.get('#loginBtn').click()

    // 验证登录成功后的行为
    cy.url().should('include', '/home'); // 确保跳转到首页或者其他成功页面
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      expect(token).to.exist; // 确保 token 存在
    });
  });

  it('输入错误的用户名和密码并登录失败', () => {
    // 输入错误的用户名和密码
    cy.get('input[placeholder="请输入用户名"]').type('wrongUser');
    cy.get('input[placeholder="请输入密码"]').type('wrongPassword');
    cy.get('#loginBtn').click()

    // 验证错误消息是否显示
    cy.get('#errorMsg').should('contain', '登录失败，请检查用户名和密码'); // 确保错误消息正确
  });
});
