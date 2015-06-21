<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

namespace Aap\BlogBundle\Service\Markdown;

/**
 * Class Markdown
 *
 * @package Aap\BlogBundle\Service\Markdown
 */
class Markdown
{
    /**
     * @param string $path
     */
    public function parse($path)
    {
        $file = new MarkdownFile($path);
        $lexer = new MarkdownLexer($file->getContents());

        $token = $lexer->nextToken();
        while (MarkdownLexer::EOF !== $token) {
            echo $token;
            $token = $lexer->nextToken();
        }
    }
}