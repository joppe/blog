<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

namespace Aap\BlogBundle\Service\Markdown;

use Aap\BlogBundle\Parsing\LL1Lexer;
use Aap\BlogBundle\Parsing\Token;

/**
 * Class MarkdownLexer
 *
 * @package Aap\BlogBundle\Service\Markdown
 */
class MarkdownLexer extends LL1Lexer
{
    const HASH = 2;

    /**
     * MarkdownLexer constructor.
     *
     * @param string $input
     */
    public function __construct($input)
    {
        parent::__construct($input);

        $this->tokenNames = array_merge(parent::$tokenNames, array(
            self::HASH => '#'
        ));
    }

    /**
     * @return Token
     */
    public function nextToken()
    {
        // TODO: Implement nextToken() method.
    }
}