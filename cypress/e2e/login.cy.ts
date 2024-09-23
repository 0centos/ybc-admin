describe('用户登录测试', () => {
    beforeEach(() => {
      // 确保在每个测试之前都访问登录页面
      cy.visit('http://localhost:4173'); // 更新为你的登录页面 URL
    });
  
    it('成功登录', () => {
      // 输入用户名和密码
      cy.get('input[placeholder="请输入用户名"]').type('admin');
      cy.get('input[placeholder="请输入密码"]').type('123456');
      
      // 提交表单
      cy.get('#loginBtn').click()
      
      // 验证是否跳转到主页
      cy.url().should('include', '/home');
      
      // 验证 token 是否存储在 localStorage 中
      cy.window().then((win) => {
        const token = win.localStorage.getItem('token');
        expect(token).to.exist; // 确保 token 存在
      });
    });
  
    it('登录失败', () => {
      // 输入错误的用户名和密码
      cy.get('input[placeholder="请输入用户名"]').type('wrongUser');
      cy.get('input[placeholder="请输入密码"]').type('wrongPassword');
      
      // 提交表单
      cy.get('#loginBtn').click()
      
      // 验证错误消息是否显示
      cy.get('#errorMsg').should('contain', '登录失败，请检查用户名和密码'); // 更新为你错误消息的文本
    });
  });
  