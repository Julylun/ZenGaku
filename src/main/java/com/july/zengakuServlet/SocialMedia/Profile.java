package com.july.zengakuServlet.SocialMedia;

import com.zengaku.mvc.controller.Exception.AuthenticationException;
import com.zengaku.mvc.controller.Exception.IncorrectProfileException;
import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.controller.SocialMedia.PostAPI;
import com.zengaku.mvc.controller.TokenUtils;
import com.zengaku.mvc.model.AuthToken;
import com.zengaku.mvc.model.Post;
import com.zengaku.mvc.model.TreeHeartUser;
import com.zengaku.mvc.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.json.JSONObject;

import java.io.IOException;
import java.util.List;

@WebServlet("/Zentizen/profile")
@MultipartConfig
public class Profile extends HttpServlet {
    private long profileId = -2;
    private long userId = -2;

    private User userObjectOfProfile = null;

    private void isThisRequestValid(HttpServletRequest req, HttpServletResponse resp, Session session) throws AuthenticationException, IncorrectProfileException {
        if((req.getSession().getAttribute("loginStatus") == null || !(boolean) req.getSession().getAttribute("loginStatus"))) {
            throw new AuthenticationException("User doesn't login");
        }
        String tmpJwt = req.getParameter("accessToken");
        System.out.println("[Profile]<isThisRequestValid>: accessToken -> " + tmpJwt);
        if(tmpJwt == null || AuthToken.isExpired(tmpJwt)) {throw new AuthenticationException("User doesn't login");}

        userId = TokenUtils.getIdByJWT(tmpJwt);
        if(userId == -3) {throw new AuthenticationException("User doesn't exist");}

        profileId = Long.parseLong(req.getParameter("id"));
        session = HibernateUtils.getSessionFactory().openSession();
        System.out.println("[Profile]<doGet>: profileId -> " + profileId);
        userObjectOfProfile = User.getUserById(profileId,session);
        if(userObjectOfProfile == null) {throw new IncorrectProfileException("This profile doesn't exist");}
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("[Profile]<doGet>: Someone is getting information.");
        HttpSession session = req.getSession();
        if(session.getAttribute("allowForward") == null) {
            System.out.println("[Profile]<doGet>: Set \"allowForward\" to true");
            session.setAttribute("allowForward","true");
        }
        if(session.getAttribute("allowForward").equals("true")) {
            System.out.println("[Profile]<doGet>: Start stalking profile");
            session.setAttribute("allowForward","false");
            req.getRequestDispatcher("/profile.jsp").forward(req,resp);
        }
    }


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getSession().setAttribute("allowForward","true");
        Session session = null;
        System.out.println("[Profile]<doPost>: Start stalking profile");
        try {
            session = HibernateUtils.getSessionFactory().openSession();
            isThisRequestValid(req,resp,session);

            List<Post> postList = Post.getPostsByUserObject(userObjectOfProfile,session);
            String jsonString = Post.listToJSON(postList,userId,session);

            JSONObject root = new JSONObject();
            root.put("posts",jsonString);
            User.getUserJson(userObjectOfProfile,root,"profileInformation");
            System.out.println(root.toString());

            resp.setContentType("application/json");
            resp.setStatus(200);
            resp.getWriter().write(root.toString());
            System.out.println("[Profile]<doPost>: Process successfully!; Error code 200");
        } catch (AuthenticationException e) {
            System.out.println("[Profile]<doPost>: Response -> User doesn't login; Error code 404");
            e.printStackTrace();
            resp.sendError(401);
        } catch (IncorrectProfileException e) {
            System.out.println("[Profile]<doPost>: Response -> Profile user doesn't exist; Error code 401");
            e.printStackTrace();
            resp.sendError(404);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if(session != null) {
                session.close();
            }
            req.getSession().setAttribute("allowForward","true");
        }
    }
}
