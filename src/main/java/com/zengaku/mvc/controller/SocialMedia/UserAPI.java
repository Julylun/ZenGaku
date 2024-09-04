package com.zengaku.mvc.controller.SocialMedia;

import com.zengaku.mvc.controller.Exception.IncorrectProfileException;
import com.zengaku.mvc.controller.Exception.Message.MissingParameterException;
import com.zengaku.mvc.controller.Exception.Token.ExpiredTokenException;
import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.model.AuthToken;
import com.zengaku.mvc.model.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.zengaku.mvc.model.Constant.UserAPIConstant;
import org.hibernate.Session;

import javax.security.sasl.AuthenticationException;
import java.io.IOException;
import java.util.Objects;

import static com.zengaku.mvc.model.Constant.UserAPIConstant.EDIT_PROFILE;

@WebServlet("/Zentizen/profile/edit")
@MultipartConfig
public class UserAPI extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            String senderJwt = req.getParameter("accessToken");
            User senderUser = null;
            if(Objects.isNull(senderJwt)) throw new AuthenticationException("Sender didn't login");
            if(AuthToken.isExpired(senderJwt)) throw new ExpiredTokenException("SenderJwt is expired");
            senderUser = AuthToken.getUserByAccessToken(senderJwt);
            if(Objects.isNull(senderUser)) throw new IncorrectProfileException("Sender doesn't exist");

            switch (Integer.parseInt(req.getParameter("type"))) {
                case EDIT_PROFILE: {
                    editProfile(req,resp,senderUser);
                    break;
                }
                default: {

                }
            }
        } catch (
                MissingParameterException |
                ExpiredTokenException |
                AuthenticationException |
                IncorrectProfileException ete
        ) {

            ete.printStackTrace();
            resp.getWriter().println("{\"isSuccessful\":false}");
        } catch (Exception e) {
            e.printStackTrace(); //lỗi -> báo lỗi
            resp.setStatus(500);
            resp.getWriter().println("{\"isSuccessful\":false}");
        }

    }

    public void editProfile(HttpServletRequest req, HttpServletResponse resp, User senderUser) throws MissingParameterException, IOException {
        Session databaseSession = HibernateUtils.getSessionFactory().openSession();
        databaseSession.beginTransaction();
        String firstname, lastname, bio, avatarUser;
        firstname = lastname = bio = avatarUser = null;

        firstname = req.getParameter("firstname");
        lastname = req.getParameter("lastname");
        bio = req.getParameter("bio");
        avatarUser = req.getParameter("avatar");

        if(Objects.isNull(firstname) || Objects.isNull(lastname) || Objects.isNull(bio) || Objects.isNull(avatarUser))
            throw new MissingParameterException("Some parameters are null");

        senderUser.setUserFirstName(firstname);
        senderUser.setUserLastName(lastname);
        senderUser.setUserAvatar(avatarUser);
        senderUser.setUserBio(bio);

        User tmpUser = databaseSession.merge(senderUser);
        databaseSession.update(tmpUser);
        databaseSession.getTransaction().commit();
        databaseSession.close();

        resp.setStatus(200);
        resp.getWriter().println("{\"isSuccessful\":true}");
    }
}
