package uncertain.ide.eclipse.action;

import org.eclipse.jface.resource.ImageDescriptor;
import org.eclipse.swt.widgets.Event;

import uncertain.composite.CompositeMap;
import uncertain.composite.QualifiedName;
import uncertain.ide.Activator;
import uncertain.ide.LocaleMessage;
import uncertain.ide.eclipse.editor.IViewer;

public class AddElementAction extends ActionListener{
	
	protected IViewer viewer;
	protected CompositeMap parent;
	protected String prefix;
	protected String uri;
	protected String localName;

	public AddElementAction(IViewer viewer, CompositeMap parent, QualifiedName childQN) {
		this.viewer = viewer;
		this.parent = parent;
		this.prefix = CompositeMapAction.getContextPrefix(parent,childQN);
		childQN.setPrefix(prefix);
		this.uri = childQN.getNameSpace();
		this.localName = childQN.getLocalName();
		setHoverImageDescriptor(getDefaultImageDescriptor());
		setText(childQN.getFullName());
	}
	
	public AddElementAction(IViewer viewer, CompositeMap parent,
			String prefix, String uri, String localName,String text) {
		this.viewer = viewer;
		this.parent = parent;
		this.prefix = prefix;
		this.uri = uri;
		this.localName = localName;
		setHoverImageDescriptor(getDefaultImageDescriptor());
		setText(text);
	}
	
	public void run() {
		CompositeMapAction.addElement(parent, prefix, uri, localName);
		if (viewer != null) {
			viewer.refresh(true);
		}
	}

	public void handleEvent(Event event) {
		run();
	}

	public ImageDescriptor getDefaultImageDescriptor() {
		return Activator.getImageDescriptor(LocaleMessage.getString("element.icon"));
	}

}
