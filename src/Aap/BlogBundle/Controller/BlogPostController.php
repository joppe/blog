<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

namespace Aap\BlogBundle\Controller;

use Aap\BlogBundle\Service\BlogPost\BlogPostManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class BlogPostController
 *
 * @package Aap\BlogBundle\Controller
 */
class BlogPostController extends Controller
{
    /**
     * @return Response
     *
     * @Route("/")
     */
    public function indexAction()
    {
        /** @var BlogPostManager $blogPostManager */
        $blogPostManager = $this->get('aap_blog.blog_post_manager');

        return $this->render('AapBlogBundle:BlogPost:index.html.twig', array(
            'posts' => $blogPostManager->getAllPosts()
        ));
    }

    /**
     * @param string $slug
     * @return Response
     *
     * @Route("/post/{slug}")
     */
    public function detailAction($slug)
    {
        /** @var BlogPostManager $blogPostManager */
        $blogPostManager = $this->get('aap_blog.blog_post_manager');

        return $this->render('AapBlogBundle:BlogPost:detail.html.twig', array(
            'post' => $blogPostManager->getPostBySlug($slug)
        ));
    }
}
