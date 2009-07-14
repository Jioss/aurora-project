package aurora.testcase.presentation;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.Writer;

import uncertain.composite.CompositeMap;
import aurora.presentation.BuildSession;
import aurora.presentation.IViewBuilder;
import aurora.presentation.PresentationManager;
import aurora.presentation.ViewComponent;
import aurora.presentation.ViewComponentPackage;
import aurora.presentation.ViewContext;
import aurora.presentation.ViewCreationException;

/**
 * Basic view demo 
 * @author Zhou Fan
 *
 */
public class HelloWorld implements IViewBuilder{
    
    /** ʵ��buildView������������������ */
    public void buildView( BuildSession session,  ViewContext view_context ) 
        throws IOException, ViewCreationException
    {
        // ��view�л�ȡcolor����
        CompositeMap view = view_context.getView();
        String color = view.getString("color");

        // ��model�л�ȡ��Ҫ��ʾ���ֶ�
        CompositeMap model = view_context.getModel();
        String field = view.getString("field");
        String greeting = model.getString(field);
        
        // ��BuildSession�л�����������Writer
        Writer out = session.getWriter();
        out.write("<span color='"+color+"'>Hello, " + greeting + "</span>");
    }

    /** �˷����ڱ�����������ʵ�� */
    public String[] getBuildSteps( ViewContext context ){
        return null;        
    }
    
    public static void main(String[] args) throws Exception {
        /// ����PresentationManager������������Ĺ�����
        PresentationManager pm = new PresentationManager();
        // ����һ��ViewComponent����<hello>�����HelloWorld�������һ��
        ViewComponent component = new ViewComponent(null, "hello", HelloWorld.class);
        // ViewComponentͨ��ViewComponentPackage��֯��һ��
        ViewComponentPackage pkg = new ViewComponentPackage();
        pkg.addComponent(component);
        // ���ոմ�����ViewComponentPackageע�ᵽPresentationManager��
        pm.addPackage(pkg);
        
        // �����������ݵ�model������greeting����
        CompositeMap model = new CompositeMap("data");
        model.put("greeting", "world");
        // ����hello��������ã�����color����
        CompositeMap view = new CompositeMap("hello");
        view.put("color", "red");
        view.put("field", "greeting");

        // ����һ��Writerʵ�������������������
        PrintWriter out = new PrintWriter(System.out);
        
        // ͨ��PresentationManager����BuildSession�������������洴��
        BuildSession session = pm.createSession( out );

        // ��ɽ������ݵĴ���
        session.buildView(model, view);
        out.flush();
        
    }
    

}
