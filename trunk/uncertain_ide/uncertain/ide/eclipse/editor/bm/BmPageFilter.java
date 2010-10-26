package uncertain.ide.eclipse.editor.bm;
import org.eclipse.jface.viewers.Viewer;
import org.eclipse.jface.viewers.ViewerFilter;

import uncertain.composite.CompositeMap;

public class BmPageFilter extends ViewerFilter {
	
	String filterColumn ;
	String filterString ="";
	public BmPageFilter(String filterColumn){
		this.filterColumn = filterColumn;
	}
	
	
	public boolean select(Viewer viewer, Object parentElement, Object element) {
		CompositeMap p = (CompositeMap) element;
		return p.getString(filterColumn).toLowerCase().startsWith(filterString.toLowerCase());
	}
	public void setFilterString(String filterString){
		this.filterString = filterString;
	}
}