package test;

import beans.Articulo;
import connection.DBConnection;
import java.sql.ResultSet;
import java.sql.Statement;

public class OperacionesDB {

    public static void main(String[] args) {
        actualizarArticulo(10, "Software");
        listarArticulo();

    }

    public static void actualizarArticulo(int id, String categoria) {
        DBConnection con = new DBConnection();
        String sql = "UPDATE articulo SET categoria = '" + categoria + "'WHERE id = " + id;
        try {
            Statement st = con.getConnection().createStatement();
            st.executeUpdate(sql);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        } finally {
            con.desconectar();
        }
    }

    public static void listarArticulo() {
        DBConnection con = new DBConnection();
        String sql = "SELECT * FROM articulo";
        try {
            Statement st = con.getConnection().createStatement();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                int id = rs.getInt("id");
                String nombre = rs.getString("nombre");
                String categoria = rs.getString("categoria");
                String tipo = rs.getString("tipo");
                int inventario = rs.getInt("inventario");
                boolean novedad = rs.getBoolean("novedad");
                Articulo articulos = new Articulo(id, nombre, categoria, tipo, inventario, novedad);
                System.out.println(articulos.toString());
            }
            st.executeQuery(sql);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        } finally {
            con.desconectar();
        }

    }

}
