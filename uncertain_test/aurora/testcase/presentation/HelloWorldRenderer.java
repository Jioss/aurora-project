/*
 * Created on 2009-7-14
 */
package aurora.testcase.presentation;

import java.util.Map;

import uncertain.composite.CompositeMap;
import aurora.presentation.BuildSession;
import aurora.presentation.ViewContext;

/**
 * Using template to create UI content 
 * @author Zhou Fan
 */
public class HelloWorldRenderer {
    
    public void onCreateViewContent( BuildSession session, ViewContext view_context ){
        
        // ��view�л�ȡcolor����
        CompositeMap view = view_context.getView();
        String color = view.getString("color");

        // ��model�л�ȡ��Ҫ��ʾ���ֶ�
        CompositeMap model = view_context.getModel();
        String field = view.getString("field");
        String greeting = model.getString(field); 
        
        // ����̬���ݷ���ViewContext��Map�У����潫�����滻ģ���е�ͬ�����
        Map content_map = view_context.getMap();
        content_map.put("color", color);
        content_map.put("value", greeting);
    }

}
