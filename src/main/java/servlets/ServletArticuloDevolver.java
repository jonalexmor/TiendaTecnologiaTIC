package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import controller.ArticuloController;

/**
 * Servlet implementation class ServletLibroDevolver
 */
@WebServlet("/ServletArticuloDevolver")
public class ServletArticuloDevolver extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ServletArticuloDevolver() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
                throws ServletException, IOException {
		// TODO Auto-generated method stub
		ArticuloController articulo = new ArticuloController();
		
		String username = request.getParameter("username");
		int id = Integer.parseInt(request.getParameter("id"));
		
		String libroStr = articulo.devolver(id,username);
		
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.println(libroStr);
		out.flush();
		out.close();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
                throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}