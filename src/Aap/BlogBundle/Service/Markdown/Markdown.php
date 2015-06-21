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
        while (MarkdownLexer::EOF_TYPE !== $token->getType()) {
            echo $token . "\n";
            $token = $lexer->nextToken();
        }
    }
}