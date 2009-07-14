/*
 * Created on 2009-7-14
 */
package aurora.testcase.presentation;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URL;

import uncertain.composite.CompositeMap;
import uncertain.core.UncertainEngine;
import aurora.presentation.BuildSession;
import aurora.presentation.PresentationManager;

public class TemplateTest {

    /**
     * Test template based view creation
     */
    public static void main(String[] args) 
        throws Exception
    {
        // APF��ʼ��
        UncertainEngine engine = UncertainEngine.createInstance();
        PresentationManager pm = new PresentationManager(engine);
        
        // ��ȡaurora/testcase/ui�ĵ�ǰ����·��
        URL url = Thread.currentThread().getContextClassLoader().getResource("aurora/testcase/ui");
        if(url==null)
            throw new IOException("aurora/testcase/ui is not found in CLASSPATH");
        String path = url.getPath();
        // ���ݻ�ȡ��·����װ�����package
        pm.loadViewComponentPackage(path);
        
        /* ���º� Step 1 ���� */
        
        // �����������ݵ�model������greeting����
        CompositeMap model = new CompositeMap("data");
        model.put("greeting", "world");
        // ����hello��������ã�����color����
        CompositeMap view = new CompositeMap("hello");
        view.put("color", "red");
        view.put("field", "greeting");

        // ����һ��Writerʵ�������������������
        PrintWriter out = new PrintWriter(System.out);
        
        // ͨ��PresentationManager����BuildSession
        BuildSession session = pm.createSession( out );

        // ��ɽ������ݵĴ���
        session.buildView(model, view);
        out.flush();        
    }

}
