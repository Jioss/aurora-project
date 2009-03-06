/*
 * DOMNodeClassLoader.java
 *
 * Created on 2001��9��18��, ����7:53
 */

package sdom;

/**
 *
 * @author  Zhou Fan
 * @version 
 */
public interface DOMNodeBuilder {

    public DOMNode getDOMNode( String prefix, String name);
    
    public String       getAttributeSetMethod( String prefix, String attrib_name );

}

