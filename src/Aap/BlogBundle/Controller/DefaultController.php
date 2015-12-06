<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

namespace Aap\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Parsedown;

/**
 * Class DefaultController
 *
 * @package Aap\BlogBundle\Controller
 */
class DefaultController extends Controller
{
    /**
     * @return Response
     *
     * @Route("/")
     */
    public function indexAction()
    {
        $posts = $this->get('aap_blog.blog_post');

        return $this->render('AapBlogBundle:Default:index.html.twig', array(
            'post' => $posts->getLastPost()
        ));
    }
}
