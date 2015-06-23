<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

namespace Aap\BlogBundle\Parsing;

/**
 * Class MemoizingParser
 * Also known as Packrat parsing
 *
 * @package Aap\BlogBundle\Parsing
 */
class MemoizingParser extends BacktrackParser
{
    /**
     * @const int
     */
    const FAILED = -1;

    /**
     * @var array
     */
    private $memo = array();

    /**
     * @return void
     */
    protected function consume()
    {
        $this->input += 1;

        if (count($this->lookahead) === $this->index && $this->isSpeculating()) {
            $this->index = 0;
            $this->lookahead = array();
            $this->memo = array();
        }

        $this->sync(1);
    }

    /**
     * Check if a rule was already parsed
     *
     * @param string $rule
     * @return bool
     * @throws \Exception
     */
    private function alreadyParsedRule($rule)
    {
        $parsed = false;

        if (true === isset($this->memo[$rule][$this->index])) {
            $parseResult = $this->memo[$rule][$this->index];

            if (self::FAILED === $parseResult) {
                throw new \Exception('Rule already failed before.');
            }

            $this->seek($parseResult);

            $parsed = true;
        }

        return $parsed;
    }

    /**
     * Store the result of the parsing of a rule.
     * If the rule failed store the FAILED constant, otherwise store the index.
     *
     * @param string $rule
     * @param int $startTokenIndex
     * @param bool $isFailed
     */
    private function memoize($rule, $startTokenIndex, $isFailed)
    {
        $stopTokenIndex = $isFailed ? self::FAILED : $this->index;

        if (false === isset($this->memo[$rule])) {
            $this->memo[$rule] = array();
        }

        $this->memo[$rule][$startTokenIndex] = $stopTokenIndex;
    }
}